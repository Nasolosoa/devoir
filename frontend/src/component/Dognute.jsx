import React from 'react';
import QRCode from 'react-qr-code'

ChartJS.register(ArcElement, Tooltip, Legend);

function Doughnute() {
    const [text,setText] = useState([]);
    const generateQr = ((e)=>{
        setText(e.target.values);
    })
    return (
        <div>
           <QRCode value={text}/>
        </div>
    )
}

export default Doughnute
