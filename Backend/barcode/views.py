from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import imageSerializer, productSerializer , codeSerializer
from .utils import decodeImage
from .models import products





class ProductFromImageView(APIView):
    def post(self, request):
        serializer = imageSerializer(data=request.data)
        if serializer.is_valid():
            codigobase64 = serializer.validated_data['codigobase64']
            barcode_data_list = decodeImage(codigobase64)

            if not barcode_data_list:
                return Response({'error': 'No se encontraron códigos de barras en la imagen.'}, status=status.HTTP_404_NOT_FOUND)

            # Suponiendo que solo hay un codigo de barras en la lista
            barcode_data = barcode_data_list[0]

            # verificamos si  el producto con el codigo de barras existe
            isproductexist = products.objects.filter(codigo_barras= barcode_data).exists()

            #si existe lo retornamos 
            if isproductexist:
                message = 'Producto encontrado'
                product = products.objects.get(codigo_barras = barcode_data)
            else:#si no existe deicmos que el producto no fue encontrado
                message = 'Producto no encontrado'
            #asignamos un producto a la varialbe product data en funcion de si el producto existe  o no existe
            product_data = productSerializer(product).data if isproductexist else 'Este producto no existe'
            #retornamos la respuesta
            return Response({
                'message' : message,
                'product' : product_data
            })
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#endpoint para consultar el producto o crearlo digitando el codigo manualmente
class digitCode(APIView):
    def post(self, request):
        serializer = codeSerializer(data=request.data)
        if serializer.is_valid():
            codigobase64 = serializer.validated_data['codigobase64']

            barcode_data = codigobase64
            

            isproductexist = products.objects.filter(codigo_barras= barcode_data).exists()


            if isproductexist:
                message = 'Producto encontrado'
                product = products.objects.get(codigo_barras = barcode_data)
            else:
                message = f'Producto no encontrado'

            product_data = productSerializer(product).data if isproductexist else 'Este Producto no existe'


            return Response({
                'message' : message,
                'product' : product_data
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class registerProduct(APIView):
    def post(self, request):
        serializer = productSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'message' : 'Producto agregado exitosamente',
                             'product' : serializer.data },
                             status = status.HTTP_200_OK)
    
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)