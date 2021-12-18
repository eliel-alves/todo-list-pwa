import { useContext } from "react";
import Alerta from "./Alerta";
import TaskContext from "./TaskContext";

const Cards = ({admin}) => {

    const { listaObjetos, acaoRemover, alerta, setObjeto, setEditar, setAlerta } = useContext(TaskContext);

    return (
        <div className="p-3">
            { admin &&
                <div className="adminArea">
                    <Alerta alerta={alerta}/>
                    <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal"
                        data-bs-target="#modalEdicao"
                        onClick={
                            () => {
                                setObjeto({id: 0, title: '', description: '', priority: '', class: '', creationDate: '', endDate: ''});
                                setEditar(false);
                                setAlerta({status: '', message: ''});
                            }
                        }>
                        Adicionar <i className="bi bi-file-earmark-plus"/>
                    </button>
                </div>
            }
            {listaObjetos.length === 0 && <h4>Nenhuma tarefa encontrada!</h4>}
            {listaObjetos.length > 0 && (
                <div className="container-fluid">
                    <div className="row">
                    {listaObjetos.map(objeto => (
                        <div className="col-12 col-sm-6 col-md-3 col-lg-2 mb-3 p-0 pe-sm-3">
                            <div className={`card shadow border-2 rounded-3 border-${objeto.class}`}>
                                <div className={`card-header text-center bg-${objeto.class}`}>
                                    <span className="badge bg-white text-dark">{objeto.id}</span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{objeto.title}</h5>
                                    <p className="card-text text-muted">{objeto.description}</p>
                                </div>

                                <ul className="list-group border-light list-group-flush">
                                    <li className="list-group-item text-muted sm-text border-light"><i className="bi bi-calendar-plus-fill text-primary"/> Criado em: <span className="text-dark fw-bold">{converter(objeto.creationDate)}</span></li>
                                    <li className="list-group-item text-muted sm-text"><i className="bi bi-calendar-check-fill text-success"/> Conclusão: <span className="text-dark fw-bold">{converter(objeto.endDate)}</span></li>
                                </ul>

                                {admin &&
                                    <div className="card-footer text-center">
                                        <button className="btn btn-success me-2" title="Concluir Tarefa"
                                                onClick={() => acaoRemover(objeto)}>
                                            <i className="bi bi-check2"/>
                                        </button>
                                        <button className="btn btn-primary" title="Editar Tarefa"
                                                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                                onClick={
                                                    () => {
                                                        setObjeto(objeto);
                                                        setEditar(true);
                                                        setAlerta({status: '', message: ''});
                                                    }
                                                }>
                                            <i className="bi bi-pencil"/>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function converter(dataString) {
    let data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}

export default Cards;