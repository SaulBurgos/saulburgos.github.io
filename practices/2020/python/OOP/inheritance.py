# super class, python call in that way to the parents classes
class Rectangulo:

    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.base * self.altura

# you inherit passing the super class
class Cuadrado(Rectangulo):

    def __init__(self, lado):
        # get the reference to the super class
        super().__init__(lado, lado)


# polimorfismo es modificar un comportamiento en herencia
class Persona:

    def __init__(self, nombre):
        self.nombre = nombre

    def avanza(self):
        print('Ando caminando')


class Ciclista(Persona):

    def __init__(self, nombre):
        super().__init__(nombre)

    # you can overwrite method that were in inherit
    def avanza(self):
        print('Ando moviendome en mi bicicleta')


def main():
    rectangulo = Rectangulo(base=3, altura=4)
    print(rectangulo.area())

    cuadrado = Cuadrado(lado=5)
    print(cuadrado.area())
    
    persona = Persona('David')
    persona.avanza()

    ciclista = Ciclista('Daniel')
    ciclista.avanza()


if __name__ == '__main__':
    main()
    
