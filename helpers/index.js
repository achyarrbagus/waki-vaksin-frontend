export function switchName(param) {
    let value;

    switch (param) {
        case 'en':
            value = 'Cepat Sehat'
            break
        case 'id':
            value = 'Cepat Sehat'
            break
        case 'ph':
            value = 'Pagalingkaagad'
            break
        case 'vn':
            value = 'Surat Sakit'
            break
        case 'th':
            value = 'Surat Sakit'
            break
        case 'kh':
            value = 'Surat Sakit'
            break
        case 'pk':
            value = 'Sickleave'
            break
        default:
            value = 'Surat Sakit'
            break
    }

    return value
}