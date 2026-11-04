import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { userdelete, Userread } from "../redux/APIdata";
import Signup from "../Component/Signup";
import { useState } from "react";
import { resetupdata, setuserupdate } from "../redux/Conterslice";

function Structuredash() {
  const search = useSelector((e) => e.constructer.SearchFilter);
  const Allcutom = useSelector((e) => e.constructer.Userdata);
  const Dispatch = useDispatch();
  const handledelete = (id) => {
    Dispatch(userdelete(id));
  };
  const [show, setshow] = useState(false);
  const [EditId, setEditId] = useState(null);

  const handleedit = (item) => {
    Dispatch(setuserupdate(item));
    setEditId(item.id);
    setshow(true);
  };
  // useEffect(()=>{Dispatch(Api())},[Dispatch])
  const [readopen, setreadopen] = useState(false);
  const handleread = (id) => {
    Dispatch(Userread(id));
    setreadopen(true);
  };

  const handleClose = () => {
    setshow(false);
    setEditId(null);
    setreadopen(false);
    Dispatch(resetupdata());
  };
  const filter = Allcutom.filter((item) =>
    [item.name, item.email, item.age]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <table className="table table-striped " data-bs-theme="dark">
        <thead>
          <tr>
            <th scope="col">S no.</th>
            <th scope="col">NAME</th>
            <th scope="col">Email</th>
            <th scope="col">age</th>
            <th scope="col">contact</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">IMAGE</th>
            <th scope="col">BUTTON</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.contact}</td>
              <td>{item.address}</td>
              <td>
                <Col xs={6} md={4}>
                  <Image
                    src={item.image}
                    roundedCircle
                    style={{ width: "40px", height: "40px" }}
                  />
                </Col>
              </td>

              <td>
                <button
                  type="button"
                  className="btn btn-success me-2"
                  onClick={() => handleedit(item)}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={() => handledelete(item.id)}
                >
                  delete
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleread(item.id)}
                >
                  read
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Signup
        show={readopen || show}
        handleClose={handleClose}
        EditId={EditId}
        readmode={readopen}
      />
    </>
  );
}

export default Structuredash;
