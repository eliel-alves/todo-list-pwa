import {useEffect, useState} from "react";
import Form from "./Form";
import TaskContext from "./TaskContext";
import Cards from "./Cards";

function Task({admin}) {
    
    const [listaObjetos, setListaObjetos] = useState(
        localStorage.getItem('TODOLIST-PWA/listaObjetos')
        ? JSON.parse(localStorage.getItem('TODOLIST-PWA/listaObjetos')) : []
    );

    const [alerta, setAlerta] = useState( {status : "", message: ""});

    const [objeto, setObjeto] = useState({id: 0, title: '', description: '', priority: '', class: '', creationDate: '', endDate: ''});

    const [editar, setEditar] = useState(false);

    const acaoCadastrar = e => {
        e.preventDefault();
        
        if(editar) { // editando objeto
            // procurar índice do obj na lista
            const index = listaObjetos.findIndex(p => p.id === objeto.id);

            // configurando classe do bagde do Card
            if(objeto.priority === "Alta") {
                objeto.class = "danger";
            } else if(objeto.priority === "Baixa") {
                objeto.class = "success";
            } else {
                objeto.class = "primary";
            }

            // recortando lista sem o obj que está sendo editado
            const listaObjetosTemp = listaObjetos.splice(0, index).concat(listaObjetos.splice(index+1));

            // adicionando obj na lista
            const newListaObjetos = [...listaObjetosTemp, objeto].sort((a,b) => a.id - b.id);
            setListaObjetos(newListaObjetos);

            setAlerta({status: 'success', message: 'Tarefa editada com sucesso!'})
        } else { // criando objeto
            if(objeto.id === 0) {
                let idAtual = localStorage.getItem('TODOLIST-PWA/sequenciaId');

                if(idAtual === null) { // primeira vez que acesso o valor
                    idAtual = 0;
                }

                let novoId = Number(idAtual) + 1;
                objeto.id = novoId;
                // setSequenciaCodigo(novoId);
                localStorage.setItem('TODOLIST-PWA/sequenciaId', novoId);

                // setando data de criação
                let dataHoje = new Date();
                objeto.creationDate = (dataHoje.getFullYear() + "-" + ((dataHoje.getMonth() + 1)) + "-" + (dataHoje.getDate()));

                // configurando classe do bagde do Card
                if(objeto.priority === "Alta") {
                    objeto.class = "danger";
                } else if(objeto.priority === "Baixa") {
                    objeto.class = "success";
                } else {
                    objeto.class = "primary";
                }

                setListaObjetos([...listaObjetos, objeto]);
                setAlerta({status: 'success', message: `Tarefa "${objeto.title}" adicionada com sucesso!`})
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setObjeto({...objeto, [name] : value});
    }

    const acaoRemover = objeto => {
        if (window.confirm('Deseja concluir essa tarefa?')) {
            const listaObjetosTemp = listaObjetos.filter(p => p.id !== objeto.id);
            setListaObjetos(listaObjetosTemp);
            setAlerta({status: 'success', message: `Tarefa "${objeto.title}" concluída com sucesso!`});
        }
    }

    useEffect( () => {
        localStorage.setItem('TODOLIST-PWA/listaObjetos', JSON.stringify(listaObjetos));
    }, [listaObjetos])

    return (
        <TaskContext.Provider value={
            { listaObjetos, acaoRemover, alerta, setAlerta, objeto, setObjeto, editar, setEditar, acaoCadastrar, handleChange }
        }>
            <Cards admin={admin}/>
            <Form/>
        </TaskContext.Provider>
    )
}

export default Task;