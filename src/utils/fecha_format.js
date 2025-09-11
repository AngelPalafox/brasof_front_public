export const fecha_format = (fecha) => {
    fecha =fecha.split('T')[0]
    fecha.split('-').reverse()
    const dia = fecha.split('-')[0]
    const mes = fecha.split('-')[1]
    const año = fecha.split('-')[2]
    return `${dia}/${mes}/${año}`
}