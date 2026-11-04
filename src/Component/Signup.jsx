import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addname, resetupdata } from "../redux/Conterslice";
import { Adduser, updateuser } from "../redux/APIdata";
import Image from "react-bootstrap/Image";

function Signup({ show, handleClose, handleedit, EditId,readmode}) {
  const isedit = Boolean(EditId);
  console.log(isedit)
  const dispatch = useDispatch();
  const name = useSelector((state) => state.constructer.signupdata);
  const signupdata = useSelector((state) => state.constructer.signupdata);
  const handledata = (e) => {
    const { name, value } = e.target;
    dispatch(addname({ name, value }));
  };
  // add signupdata in api and dashboard
  const handlesignup = async () => {
    const result = isedit
      ? await dispatch(updateuser({ id: EditId, data: signupdata }))
      : await dispatch(Adduser(signupdata));
    const ok = isedit
      ? updateuser.fulfilled.match(result)
      : Adduser.fulfilled.match(result);
    if (ok) {
      dispatch(resetupdata());
      handleClose();
    } else {
      alert("add data feild");
    }
  };
  return (
    <Modal show={show} handleedit={handleedit} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{readmode? "user detail":isedit ? "Edituder" : "singup"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {readmode && name.image && (
          <div  className="text-center mb-3">
      <Image
        src={name.image}
        roundedCircle
        style={{ width: "120px", height: "120px", objectFit: "cover" }}
      />
          </div>
        )}
        {readmode ? (<div>
          {
            [
              ["NAME" , name.name],
              ["EMAIL" , name.email],
              ["AGE" , name.age],
              ["CONTACT" , name.contact],
              ["ADDRESS" , name.address],
            ].map(([label,value])=>(
              <div key={label} className="d-flex mb-2">
               <strong style={{ width: "100px" }}>{label}:</strong>
          <span>{value}</span>
              </div>
            ))
          }
        </div>):( <>
            <FloatingLabel controlId="name" label="enter name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="enter your full name"
            name="name"
            value={name.name}
            onChange={handledata}
          />
        </FloatingLabel>
        <FloatingLabel controlId="email" label="Email address" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={name.email}
            onChange={handledata}
          />
        </FloatingLabel>
        <FloatingLabel controlId="Age" label="Age" className="mb-3">
          <Form.Control
            type="number"
            placeholder="enter your age"
            name="age"
            value={name.age}
            onChange={handledata}
          />
        </FloatingLabel>
        <FloatingLabel controlId="contact" label="contact" className="mb-3">
          <Form.Control
            type="tel"
            placeholder="name@example.com"
            name="contact"
            value={name.contact}
            onChange={handledata}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="Addressinput"
          label="Address"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="place"
            name="address"
            value={name.address}
            onChange={handledata}
          />
        </FloatingLabel>
        <FloatingLabel controlId="image" label="image" className="mb-3">
          <Form.Control
            type="url"
            accept="image/*"
            placeholder="https://example.com"
            name="image"
            value={name.image}
            onChange={handledata}
          />
        </FloatingLabel>
        </>)}
     
      </Modal.Body>
     {!readmode&&( <Modal.Footer className=" justify-content-center">
        <Button variant="primary" onClick={handlesignup}>
          {isedit ? "Edituder" : "singup"}
        </Button>
      </Modal.Footer>)}
    </Modal>
  );
}

export default Signup;
