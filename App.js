import React, {useState, useEffect} from 'react';
import { StyleSheet,View, FlatList, ActivityIndicator} from 'react-native';
import Filmes from './src/Filmes/Index';
import api from './src/services/api'
 
export default function App() {
  //esse use sate serve para colocar esses  filemes na tela
  const [filmes, setFilmes] = useState()
  const [loading, setLoading] = useState(true)


  //quando o usser ver a tela quero que ele carrega todos os meus files da api
  useEffect(() => {

    async function loadFilmes() {
      //nao ha setFilmes sem antes haver resposta por parte da api
      const response = await api.get('r-api/?api=filmes')
      ///no response.data temos o nosso couteudo da api 
      // console.log(response.data)
      setFilmes(response.data)
      setLoading(false)
    }

    loadFilmes()

  }, [])

  if(loading) {
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="#12121212" size={45} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList
        data={filmes}
        keyExtractor ={ item => String(item.id)}
        renderItem={ ({ item }) => <Filmes  data={item} /> }
        /> 
       </View>
    );
  }
  
  }


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 25 
  }, 
});
