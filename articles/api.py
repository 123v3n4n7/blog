from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from django.contrib.auth.models import User
from knox.models import AuthToken

from .models import Articles, Comments, Profile
from .serializers import ArticleSerializer, CommentsSerializers, \
    UserSerializer, CreateUserSerializer, LoginUserSerializer, ProfileSerializer, ArticlePostSerializer, ArticleUpdateSerializer

class ArticleViewSet(generics.GenericAPIView):
    def get(self, request):
        queryset = Articles.objects.all()
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

class ArticlePost(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def post(self, request):
        serializer = ArticlePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


class ArticleDelete(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated,]
    def delete(self, request, id):
        queryset = Articles.objects.get(id=id)
        serializer = ArticleSerializer(queryset)
        if (request.data.get('owner')) == serializer.data.get('ownerName'):
            print(request.data.get('owner'), queryset.owner, "YEEEES")
            queryset.delete()
        else:
            print(type(request.data.get('owner')), type(serializer.data.get('ownerName')))
        return Response({"status": "delete"})

    def put(self, request, id):
        print(request.data.get('owner'))
        instance = Articles.objects.get(id=id)
        serializer = ArticleSerializer(instance)
        if (request.data.get('owner')) == serializer.data.get('ownerName'):
            serializer = ArticleUpdateSerializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            serializer = ArticleSerializer(instance)
            return Response(serializer.data)

class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CommentsSerializers

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class ProfileGetAPI(generics.GenericAPIView):
    def get(self, request, username, **kwargs):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = None
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            profile = None
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

class ProfileAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser,)
    def put(self, request, username):
        user = User.objects.get(username=username)
        instance = Profile.objects.get(user=user)
        instance.image = request.data['image']
        instance.info = request.data['info']
        instance.save()
        return Response("Ok")
