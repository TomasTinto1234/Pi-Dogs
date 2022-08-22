import React, {Fragment} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clean, deleteDog } from "../actions";
import { useEffect } from "react";
import "./Detail.css"

export default function Details() {
  const dispatch = useDispatch();
  const miStateDetail = useSelector((state) => state.detail);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(clean());
  }, [dispatch]);

  function handleDelete() {
    console.log(id);
    dispatch(deleteDog(id));
    alert("Perro eliminado de la DB");
    history.push("/home");
  }

  return (
    <div>
      <div className="container">         
         { <button className="tooltip" onClick={(e) => {
            handleDelete(e);
          }}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
            <path fill="#6361D9" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-Rule="evenodd" fill-Rule="evenodd"></path>
          </svg>
          <span className="tooltiptext"> borrar Perro</span>
        </button>}

          <Link to="/home">
            <button className="select">volver al Home</button>
          </Link>

        
      </div>
      <div className="card">
        {miStateDetail.length > 0 ? (
          <div className="bodix">
            <div className="mainContainer">
            <img className="image"
              src={
                miStateDetail[0].image
                  ? miStateDetail[0].image
                  : "https://static.wixstatic.com/media/16fbb1_66e6f7d8ae444a88a34f96b90b9d2d8c~mv2.png/v1/fill/w_700,h_700,al_c/icon.png"
              }
              alt={`${miStateDetail[0].name}`}
              width="400px"
              height="450px"
            />
            <div className="detailsConteiner">

              <h1><u>{miStateDetail[0].name}</u></h1>
              <h3>
                <u className="infoSection">Temperamentos</u> : {miStateDetail[0].temperament > 1
                  ? miStateDetail[0].temperament.map((e) => e + " ")
                  : miStateDetail[0].temperament}
              </h3>
              <div>
                <h4 className="infoSection"><u>años</u> : {miStateDetail[0].life_span} </h4>
                <h4 className="infoSection">
                  <u> Altura</u> : {miStateDetail[0].heightMin}-
                  {miStateDetail[0].heightMax} Cm
                </h4>

                <h4 className="infoSection">
                  <u> Peso</u> : {miStateDetail[0].weightMin}-
                  {miStateDetail[0].weightMax} Kg
                </h4>
              </div>
            </div>
            </div>
          </div>
        ) : (
          <div >
            <img
              src="https://i.pinimg.com/originals/79/a4/b9/79a4b912377bcf73101684d62ea9590f.gif"
              alt="img not found"
            />
          </div>
        )}
      </div>
      <div className="icons-wrapper">
			<Fragment>

          <a  href="https://www.instagram.com/tomas_tinto/" target="_blank" class="ri-instagram-line icon">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

	
          <a href="https://www.facebook.com/tititinto/" target="_blank" class="ri-facebook-circle-line icon">
            <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
          </a>

		
        <a href="https://web.whatsapp.com/" target="_blank" class="ri-whatsapp-line icon"><img
              src="https://png.pngtree.com/element_our/md/20180626/md_5b321c98efaa6.jpg"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>

       
	
              <a href="https://github.com/TomasTinto1234" class="ri-instagram-line icon" target='_blank' rel="noreferrer"><img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="img not found"
              width="40px"
              height="45px"
			  /></a>
   
              <a href="https://www.linkedin.com/in/tomas-tinto-320a85236/" class="ri-facebook-circle-line icon" target='_blank' rel="noreferrer">
			  <img
              src="data:image/png;base64,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"
              alt="img not found"
              width="40px"
              height="45px"
			  />
              </a>

	
	  </Fragment>
      </div>
    </div>
  );
}
