class Person:

    #constructor and is good practice to define self in all methods
    def __init__ (self, name, age):
        self.name = name
        self.age = age
        #for private varaible python use the convention _
        self._goals = 'Good life'

    def sayHi(self):
        print(f'Hi my name is {self.name}')


class Worker:

    def __init__(self):
        self.salary = 0

    def add_salary(self,money):
        self.salary = money
    
    def earn(self):
        #is a null operation
        pass 


class Lavadora:

    def __init__(self):
        pass

    def lavar(self, temperatura='caliente'):
        self._llenar_tanque_de_agua(temperatura)
        self._anadir_jabon()
        self._lavar()
        self._centrifugar()

    #private method
    def _llenar_tanque_de_agua(self, temperatura):
        print(f'Llenando el tanque con agua {temperatura}')

    def _anadir_jabon(self):
        print('Anadiendo jabon')

    def _lavar(self):
        print('Lavando la ropa')

    def _centrifugar(self):
        print('Centrifugando la ropa')

# if this file is execute on the terminal
if __name__ == '__main__':

    gallinita = Person('gallinita', 35)
    gallinita.sayHi()
    print(gallinita._goals)

    #check is a object is instance of a class
    isinstance(gallinita,Person)

    lavadora = Lavadora()
    lavadora.lavar()

