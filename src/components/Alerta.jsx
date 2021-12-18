const Alerta = ({alerta}) => {

    let classe = '';

    if(alerta.status === 'error') {
        classe = 'alert border-2 border-danger global-alert alert-danger';
    } else {
        classe = 'alert border-2 border-success global-alert alert-success';
    }

    if(alerta.message.length > 0) {
    
        return (
            <div className={classe} role="alert">
                {alerta.message}
            </div>
        );

    } else {
        return (
            <div></div>
        );
    }
 
}

export default Alerta;