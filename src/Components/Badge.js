export default function Badge(props){
    return(
        <img className={props.class} alt={props.alt} src={props.path} width={35} height={35} />
    )
}