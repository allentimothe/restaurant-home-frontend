import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Clock from "./components/Clock/Clock";
import TimePunch from "./components/TimePunch/TimePunch";
import './App.css';
//====================================
import { auth } from './services/firebase';
import { 
  fetchInfo, 
  deleteInfo, 
  createInfo, 
  updateInfo } from './services/api-service';
//====================================
export default function App() {
    const [state, setState] = useState({
      user: null,
      managerUser: null,
      employeeInfo: [],
      newInfo: [
        {
        emplyeeID: [],
        managerID: [],
        timePunch: [],
    }],
    editMode: false
  });
  //====================================

    useEffect(() => {
      async function getAppData() {
        if(!state.user) return;
        try {
          const employeeInfo = await fetchInfo(state.user.uid);
          setState((prevState) => ({
            ...prevState,
            employeeInfo,
          }));
        } catch (error) {
          console.log(error)
        }
      }
      getAppData();
      
      const cancelSubscription = auth.onAuthStateChanged(user => {
        if(user) {
          setState(prevState => ({
            ...prevState,
            user,
          }));
        } else {
          setState(prevState => ({
            ...prevState,
            employeeInfo: [],
            user,
          }));
        }
      });
  
      return function() { // cleanup function
        cancelSubscription();
      }
  
    }, [state.user]);
  //====================================
  
    async function handleSubmit(e) {
      if(!state.user) return;
      
      e.preventDefault();
  
      if(!state.editMode) {
  
        const employeeInfo = await createInfo(state.newInfo, state.user.uid)
        
  
      setState((prevState) => ({
        ...prevState,
        employeeInfo,
        newInfo: {
          emplyeeID: "",
          managerID: "",
          timePunch: "",
        },
      }));
  } else {
  
    const employeeInfo = await updateInfo(state.newInfo);
  
    setState(prevState => ({
      ...prevState,
      employeeInfo,
      newInfo: {
        emplyeeID: "",
        managerID: "",
        timePunch: "",
      },
      editMode: false
    }));
  }
  }
  //====================================
    function handleChange(e) {
      setState((prevState) => ({
        ...prevState, 
        newInfo: {
          ...prevState.newInfo,
          [e.target.emplyeeID]: e.target.value 
        }
      })) 
    }
  //====================================
    async function handleDelete(infoId) {
      if(!state.user) return;
      
      const employeeInfo = await deleteInfo(infoId);
      
      setState(prevState => ({
        ...prevState,
        employeeInfo,
      }));
    }
  //====================================
    function handleEdit(infoId) {
      const { emplyeeID, managerID, timePunch, _id } = state.employeeInfo.find(
        emplyeeID => emplyeeID._id === infoId,
        managerID => managerID._id === infoId,
        timePunch => timePunch._id === infoId,
      );
      setState(prevState => ({
        ...prevState,
        newInfo: {
          emplyeeID,
          managerID,
          timePunch,
          _id,
        },
        editMode: true
      }));
    }
  //====================================
    function handleCancel() {
      setState(prevState => ({
        ...prevState,
        newInfo: {
          emplyeeID: "",
          managerID: "",
          timePunch: "",
        },
        editMode: false
      }));
    }
  
  //====================================
    return (
      <>
      <div className='App'>
      <TimePunch handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              handleCancel={handleCancel} 
              handleDelete={handleDelete} 
              handleEdit={handleEdit} 
              />
        <Header user={state.user} />
        <main>
          <section>
            {/* <Switch> */}
            { 
              state.user && 
              <>
              <hr />
  {/* ====================================*/}
                <Clock />
              <TimePunch handleChange={handleChange} 
              handleSubmit={handleSubmit} 
              handleCancel={handleCancel} 
              handleDelete={handleDelete} 
              handleEdit={handleEdit} 
              />
  {/* ====================================*/}
              </>
            }
            {/* // </Switch> */}
             </section>
            </main>
            <footer className="footer">
          &copy; Food Truck Clock-In
        </footer>
        </div>
      </>
  
  
  );
}


