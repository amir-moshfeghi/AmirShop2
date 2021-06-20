from datetime import datetime

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from base.models import Product, Order, ShippingAddress, OrderItem
from base.products import products
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) ==0:
        return Response({'detail':'no order items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(user=user,paymentMethod=data['paymentMethod'],taxPrice=data['taxPrice'],shippingPrice=data['shippingPrice'],totalPrice=data['totalPrice'])
        shipping = ShippingAddress.objects.create(order=order,address=data['shippingAddress']['address'],city=data['shippingAddress']['city'],postalCode=data['shippingAddress']['postalCode'],country=data['shippingAddress']['country'])
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(product=product,order=order,name=product.name,qty=i['qty'],price=i['price'],image=product.image.url)
            product.countInStock -=item.qty
            product.save()
        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'NOT authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'ORder does bot exist'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('order was paid')
