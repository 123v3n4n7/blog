from django.contrib import admin
from .models import Articles, Comments, Profile

class ArticleComment(admin.TabularInline):
    model = Comments
    extra = 2

class AdminArticle(admin.ModelAdmin):
    inlines = [ArticleComment,]

admin.site.register(Articles, AdminArticle)
admin.site.register(Profile)

# Register your models here.
