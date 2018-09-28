from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Articles(models.Model):
    owner = models.ForeignKey(User, related_name="articles", on_delete=models.CASCADE, null=True)
    articleName = models.CharField(max_length=50, default=0)
    text = models.CharField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.text

class Comments(models.Model):
    articleComment = models.ForeignKey(Articles, on_delete=models.CASCADE)
    commentText = models.TextField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
    class Meta():
        db_table = "comments"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    info = models.CharField(max_length=300, null=True)
    image = models.ImageField(upload_to="pictures/%Y/%m/%d/", max_length=255, null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def user_create_or_edit(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.profile.save()

# Create your models here.