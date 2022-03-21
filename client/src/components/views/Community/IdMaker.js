import React, {useState, useEffect} from 'react'

function IdMaker(props) {
    const [Id, setId] = useState()

    useEffect(() => {
            if(props.page === 1){
                setId(props.count)
                 
            }else{
                setId(props.count + (props.page-1) * 7)
            }
        
    }, [props.community])
    
  return (
    <td>{Id}</td>
  )
}

export default IdMaker