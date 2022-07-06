
import BudgetCard from './budget/BudgetCard'
import TotalBudgetCard from './budget/TotalBudgetCard'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

import { budgetClose, budgetShow, getShow } from '../feature/budget/modalSlice';

export default function Home() {
    
    const dispatch = useDispatch();

  const cardStyling={
    display: 'grid',
    gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr)",
    gap: '1rem',
    alignItems: 'flex-start'
  }

  const handleClose = () =>{
    dispatch(budgetClose(true))
  }
  const handleShow = ()=>{
    dispatch(budgetShow(true))
  }
  const show = useSelector(getShow);
  console.log(show)
  
  return (
    <>
     <div className='container'>
        <div style={cardStyling}>
               <BudgetCard />
               <TotalBudgetCard />
        </div>
    </div>

     <Modal show={show ? handleShow : false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
   
  )
}
