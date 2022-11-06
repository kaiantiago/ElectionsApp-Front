import { react, useState, useEffect, useCallback } from 'react';
import styles from './styles';


import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView, Image
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import CardResultado from '../../componentes/card_resultados';
import { obtemVotos } from '../../services/api_votos';
import { obtemCandidatos } from '../../services/api_candidato';



export default function Resutados({ navigation }) {

    //A tela de resultados será composta de accordeons, eles se eoncontram disponíveis na pasta de componentes
    
    /* TODO Colocar no return quando estiver pronto!!! 

    <ScrollView style={styles.listaResultado}>
            <Text style={{marginTop: 25}}></Text>
            {
                resultado.map((resultado, index) => (
                    <CardResultados resultado={resultado} key={index.toString()}
                        />
                ))
            }
            </ScrollView>
    */
    
    const [votos, setVotos] = useState([]);
    const [candidatos, setCandidatos] = useState([]);
    const [estados, setEstados] = useState([
        { label: 'AC', value: 'AC' },
        { label: 'AL', value: 'AL' },
        { label: 'AM', value: 'AM' },
        { label: 'AP', value: 'AP' },
        { label: 'BA', value: 'BA' },
        { label: 'CE', value: 'CE' },
        { label: 'DF', value: 'DF' },
        { label: 'ES', value: 'ES' },
        { label: 'GO', value: 'GO' },
        { label: 'MA', value: 'MA' },
        { label: 'MG', value: 'MG' },
        { label: 'MS', value: 'MS' },
        { label: 'MT', value: 'MT' },
        { label: 'PA', value: 'PA' },
        { label: 'PB', value: 'PB' },
        { label: 'PE', value: 'PE' },
        { label: 'PI', value: 'PI' },
        { label: 'PR', value: 'PR' },
        { label: 'RJ', value: 'RJ' },
        { label: 'RN', value: 'RN' },
        { label: 'RO', value: 'RO' },
        { label: 'RR', value: 'RR' },
        { label: 'RS', value: 'RS' },
        { label: 'SC', value: 'SC' },
        { label: 'SE', value: 'SE' },
        { label: 'SP', value: 'SP' },
        { label: 'TO', value: 'TO' }
    ]);
    async function processamentoUseEffect() {
        await carregaDados();
    }

    useEffect(
        () => {
        console.log('executando useffect');
        processamentoUseEffect();
    }, []);
    
    function carregaDados() {
        try {
            obtemVotos().then((response) => response.json())
            .then((resposta) => {
                let vts = resposta.voto;
                console.log(resposta)
                setVotos(vts);
                obtemCandidatos().then((response) => response.json())
                .then((resposta) => {
                    let cds = resposta.candidatos;
                    //setCandidatos(cds);
                    //console.log(votos);
                    cds.forEach(cd => {
                        var nomeCampo = "";
                        if(cd.cargo=="GOVERNADOR"){
                            nomeCampo = "candidatoGov";
                        }
                        else if(cd.cargo=="PRESIDENTE"){
                            nomeCampo = "candidatoPres";
                        }
                        else{
                            nomeCampo = "candidatoSen";
                        }

                        var total = vts.filter(vt => vt[nomeCampo] == cd._id).length;
                        cd.votos = total;
                    });
                    console.log(cds);
                    //usar cds para passar pro card
                    setCandidatos(cds);
                }).catch((err )=> {
                    console.log("Promise Rejected:"+err);
            });
            }).catch((err )=> {
                console.log("Promise Rejected:"+err);
           });
        } catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.areaBtnVoltar}>
                <TouchableOpacity style={styles.btnVoltar} onPress={
                    () => navigation.navigate('Home')
                }>
                    <Text style={styles.textBtnVoltar}> Voltar </Text>
                </TouchableOpacity>
                <Text style={styles.titulo}>Resultados</Text>
            </View>

            <ScrollView style={styles.listaProdutos}>
                <Text style={{marginTop: 25}}></Text>
                <CardResultado votos={candidatos.filter(cand => cand.cargo == "PRESIDENTE")} titulo={'presidente'} 
                    />
                <CardResultado votos={candidatos.filter(cand => cand.cargo == "SENANADOR")}  titulo={'senador'} />
                {
                    estados.map((estd, index) => (
                        <View>{candidatos.some(c => c.estado == estd.estado)?
                        <CardResultado key={index.toString()} votos={candidatos.filter(cand => cand.cargo == "GOVERNADOR"&&cand.estado == estd.value)} titulo={`governador ${estd.value}`} />
                        : <View></View>}
                        </View>
                    ))
                }

            </ScrollView>

        </View>
    )
}

/*  *//**  */