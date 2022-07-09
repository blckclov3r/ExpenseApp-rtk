import { createSlice } from "@reduxjs/toolkit";


export const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        budgetList: [
            {
                id:"jdD8BbCHsTMdgkjzsaLVL",
                name:"GCash",
                max: 1000
            }
        ]
    },
    reducers: {
        setBudget: (state,action)=> {
            let existed = state.budgetList.find(item => item.name === action.payload.name)
            // if status is false | not exist it will return false
            if(!existed){
                state.budgetList = [...state.budgetList,action.payload];
            }
        },
        deleteBudgetId: (state,action) =>{
            const budget =  state.budgetList.filter((budget)=>budget.id !== action.payload);
            state.budgetList = budget;
        }
    }
});

export const getAllBudgets = (state) => state.budgets.budgetList;

export const getTotalMax = (state) => state.budgets.budgetList.reduce((total,budget)=>{
    return total + Number(budget.max);
  },0);


export const {setBudget,deleteBudgetId} = budgetSlice.actions
export default budgetSlice.reducer