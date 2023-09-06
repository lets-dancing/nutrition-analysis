export const Nutrition = ({label, quantity, unit}) => {
    return(
    <div>
        <p><b>{label}</b> - {Math.round(quantity * 100) / 100} {unit}</p>
    </div>
    )
}

