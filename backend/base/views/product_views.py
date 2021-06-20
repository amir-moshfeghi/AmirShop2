from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if (query == None):
        query=''
    print(query)

    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def getProduct(request,pk):
   product = Product.objects.get(_id=pk)
   serializer = ProductSerializer(product,many=False)
   return Response(serializer.data)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail':'product already reviewd'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        content = {'detail':'please select rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(user=user,product=product,name=user.first_name,rating=data['rating'],comment=data['comment'])
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response({'detail':'review added'})