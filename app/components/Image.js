const Image = ({bgImage}) => {
  return (
    <div 
    className="bg-base-300 h-56 border border-dashed border-neutral m-3 rounded-xl"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    </div>
  )
}

export default Image
