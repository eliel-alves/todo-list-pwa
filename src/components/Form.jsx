import { useContext } from 'react';
import TaskContext from './TaskContext';

function Form() {

    const { objeto, handleChange, acaoCadastrar } = useContext(TaskContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" data-bs-backdrop="static" aria-labelledby="modalTarefa" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-light">
                        <h5 className="modal-title" id="modalTarefa">Tarefa</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"/>
                    </div>

                    <form id="form" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text">ID</span>
                                <input type="text" readOnly className="form-control"
                                    id="txtID" name="id" value={objeto.id} onChange={handleChange} />
                            </div>

                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" required placeholder="Insira o título da tarefa"
                                    id="txtTitle" name="title" value={objeto.title} onChange={handleChange} />
                                <label htmlFor="txtTitle" className="form-label">Título</label>
                            </div>

                            <div className="form-floating mt-3">
                                <textarea className="form-control" required placeholder="Descreva os itens da tarefa"
                                    id="txtDescription" name="description" value={objeto.description} onChange={handleChange} />
                                <label htmlFor="txtDescription" className="form-label">Itens da Lista</label>
                            </div>

                            <div className="form-floating mt-3">
                                <input type="date" className="form-control" required placeholder="Data de conclusão da tarefa"
                                       id="dateEndDate" name="endDate" value={objeto.endDate} onChange={handleChange} />
                                <label htmlFor="dateEndDate" className="form-label">Conclusão</label>
                            </div>

                            <label className="form-label fw-bold mt-3 d-block" htmlFor="radioNormal">Prioridade</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="priority"
                                       required id="radioBaixa" checked={objeto.priority === "Baixa"} value="Baixa" onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="radioBaixa">Baixa</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="priority"
                                       required id="radioNormal" checked={objeto.priority === "Normal"} value="Normal" onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="radioNormal">Normal</label>
                            </div>
                            <div className="form-check form-check-inline mb-2">
                                <input className="form-check-input" type="radio" name="priority"
                                       required id="radioAlta" checked={objeto.priority === "Alta"} value="Alta" onChange={handleChange}/>
                                <label className="form-check-label" htmlFor="radioAlta">Alta</label>
                            </div>

                        </div>

                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-primary">Salvar <i className="bi bi-save" data-bs-dismiss="modal"/></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Form;