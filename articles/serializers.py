from rest_framework import serializers
from .models import Articles, Comments, Profile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class ArticleSerializer(serializers.ModelSerializer):
    ownerName = serializers.CharField(source='owner.username')

    class Meta:
        model = Articles
        fields = ('id', 'articleName', 'text', 'created_at', 'owner', 'ownerName')


class ArticlePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = ('id', 'articleName', 'text', 'created_at', 'owner')


class ArticleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = ('text', 'articleName')

        def update(self, instance, validated_data):
            instance.text = validated_data.get("text", instance.info)
            instance.articleName = validated_data.get("articleName", instance.image)
            instance.save()
            return instance


class CommentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'commentText', 'articleComment', 'date')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], None, validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in")


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("info", "image", "user")


class ProfileEditSerializer(serializers.ModelSerializer):
    class Meta():
        model = Profile
        fields = ("info", "image", "user")

    def update(self, instance, validated_data):
        instance.info = validated_data.get("info", instance.info)
        instance.image = validated_data.get("image", instance.image)
        instance.user = validated_data.get("user", instance.user)
        instance.save()
        return instance
