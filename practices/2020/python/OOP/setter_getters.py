class CasillaDeVotacion:

    def __init__(self, identificador, pais):
        self._identificador = identificador
        self._pais = pais
        self._region = None

    # in order to access a method like a property with dot notation  .region
    # useful to do calculation beore return the value
    # getter
    @property
    def region(self):
        return self._region

    #setter
    @region.setter
    def region(self, region):

        if region in self._pais:
            self._region = region
        else:
            raise ValueError(f'La region {region} no esta en la lista')


casilla = CasillaDeVotacion(123, ['Mexico', 'Morelos'])
print(casilla.region)
casilla.region = 'Mexico'
print(casilla.region)
