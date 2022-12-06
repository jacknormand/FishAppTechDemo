import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import * as SQLite from 'expo-sqlite'

export default function App() {


  const db = SQLite.openDatabase("fish.db");

  const [data, setData] = useState({
    PIT: 985141003340459,
    species: 'Rainbow Trout',
    times_caught: 0,
    size: 0,
    cursize:0
  });

  function addDataToDb (PIT, size)
  {
  
    db.transaction(tx => {
      
      var data;

      // check if local table exists first
      tx.executeSql(
        "create table if not exists fishTable (pit integer prmiary key not null, species varchar(100), times_caught integer, size integer);",
        []
      );
      
      // check if pit tag in system
      tx.executeSql(
        "select * from fishTable WHERE PIT = ?",
        [PIT],
        // success
        (_, { rows: { _array } }) => updateData(_array, PIT, size),
        // error
        () => console.log("error fetching")
      );

  
      // // get values, check if PIT code already in
  
      // // insert value entered
      // tx.executeSql(
      //   "insert into fishTable (pit, species, times_caught, size) values (?, ?, ?, ?)",
      //   [985141003340459, "Rainbow Trout", 3, size]
      // );
  
      // // first is sql, second is arguments, third is success, fourth is error
      // tx.executeSql(
      //   "select * from fishTable",
      //   null,
      //   // success
      //   (_, { rows: { _array } }) => printInfo(_array),
      //   // error
      //   () => console.log("error fetching")
      // );

    });

  };

  function getDb ()
  {
    db.transaction(tx => {

    tx.executeSql(
      "select * from fishTable WHERE PIT = ?",
      [data.PIT],
      // success
      (_, { rows: { _array } }) => getData(_array),
      // error
      () => console.log("error fetching")
    );
  });
  };

  const updateData = (_array, PIT, size) => {
    // if nonexistant
    if (Object.keys(_array).length == 0)
    {
      db.transaction(tx => {

        tx.executeSql(
        "insert into fishTable (pit, species, times_caught, size) values (?, ?, ?, ?)",
        [PIT, "Rainbow Trout", 0, size]
      );

      });
      console.log("INSERTED");
    }
    // update
    else{
      db.transaction(tx => {

        tx.executeSql(
        "UPDATE fishTable SET species = ?, times_caught =?, size = ? WHERE pit = ?",
        ["Rainbow Trout", 0, size, PIT]
      );

      });
      console.log("UPDATED");
    }


    // PRINT DB AFTER INSERT OR UPDATE
    db.transaction(tx => {

      tx.executeSql(
        "select * from fishTable",
        [],
        // success
        (_, { rows: { _array } }) => console.log(_array),
        // error
        () => console.log("error fetching after update")
      );

    });






  }

  const getData = (_array) => {
    // if not existant

    if (Object.keys(_array).length == 0)
    {
      Alert.alert(
        "Fail",
        "Cant get data for PIT tag not in system",
        [
          { text: "Close" },
        ]
      );
    }

    else{

      var data = Object.values(_array[0]);
      setData({ size: data[3], PIT: data.PIT, species: data.species});
    }
}

function resetDb()
{
  db.transaction(tx => {
    tx.executeSql(
      "drop table if exists fishTable",
      []
    );
  });
}

  const printInfo = (_array) => {
    console.log("success!\n");
    console.log(Object.values(_array[0]));

    Alert.alert(
      "Success",
      "Data Updated",
      [
        { text: "Close" },
      ]
    );
  };
  

  return (
    <View style={styles.container}>
        <Image style={styles.launchIcon } source={require('./assets/PHYSH.png')} resizeMode="contain"></Image>
        <View style={styles.holderBox}>
          <Text style={styles.PitText}>PIT Tag</Text>
          {/* <Text style={styles.pittag}>{data.PIT}</Text> */}
          <TextInput style = {styles.pittag}
               placeholder = "Enter tag"
               placeholderTextColor = "rgba(0, 0, 0, 1)"
               autoCapitalize = "none"
               value={data.PIT}
               onChangeText={text => setData({ size: data.size, PIT: text, species: data.species})}
               />
          <Text style={styles.PitText}>Species</Text>
          <Text style={styles.pittag}>n/a</Text>
          <Text style={styles.PitText}>Last Caught</Text>
          <Text style={styles.pittag}>n/a</Text>
          <Text style={styles.PitText}>Last Recorded Size</Text>
          <Text style={styles.pittag}>{data.size}</Text>

          <Text style={styles.newData}>New Size</Text>

          <TextInput style = {styles.input}
               placeholder = "Size (cm)"
               placeholderTextColor = "rgba(0, 0, 0, 0.3)"
               autoCapitalize = "none"
               value={data.size}
               onChangeText={text => setData({ cursize: text, PIT: data.PIT, species: data.species})}
               />
              
          <View style={styles.buttons}>
          <TouchableOpacity style={styles.box} onPress={ () => addDataToDb(data.PIT, data.size) }>
            <Text style={styles.boxText}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={ () => getDb() }>
            <Text style={styles.boxText}>Get</Text>
          </TouchableOpacity>
          </View>

          

        </View>
        <TouchableOpacity style={styles.boxTwo} onPress={ () => resetDb() }>
            <Text style={styles.boxText}>RESET LOCAL DB</Text>
        </TouchableOpacity>
    </View>
  );
}

// 42539f
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center' 
  },

  newData:{
    color: '#333',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    top: "5%",
  },

  input: {
    marginTop: 50,
    fontSize: 30,
    backgroundColor: 'white',
    width: '80%',
  },

  holderBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '80%',
    height: '70%',
    borderRadius: 10,
    alignItems: 'center',
    bottom: 10,
  },

  PitText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    top: "5%",
  },

  pittag: {
    color: '#191919',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    top: "5%",
    textShadowColor: 'black',
    textShadowRadius: 0,
    marginBottom: 20,
  },

  launchIcon:{
    height: 50,
    width: 50,
    top: -25,
 },
 buttons:{
  bottom: "5%",
  flex:1,
  flexDirection: "row",
  position: "absolute",
  justifyContent: 'center',
},
 box:{
  height: 80,
  width: "40%",
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: 10,
  justifyContent: 'center',
},

boxTwo:{
  height: 30,
  width: "40%",
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: 10,
  justifyContent: 'center',
},

boxText:{
  color: 'white',
  fontSize: 15,
  textAlign: 'center',
  fontWeight: 'bold',
},
content: {
  flex: 1,
  backgroundColor: '#33373B',
},
});
