import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./Components/AddBudgetModal";
import AddExpenseModal from "./Components/AddExpenseModal";
import BudgetCard from "./Components/BudgetCard";
import TotalBudgetCard from "./Components/TotalBudgetCard";
import UncategorizedBudgetCard from "./Components/UncategorizedBudgetCard";
import ViewExpensesModal from "./Components/ViewExpensesModal";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./Contexts/BudgetContext";

function App() {

    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const { budgets, getBudgetExpenses } = useBudgets();

    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    return (
        <>
            <Container dir="rtl"  className="my-4">
                <Stack  direction="horizontal" gap='2' className="mb=4">
                    <  h1 className="me-auto"  >ניהול תקציב</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                       תקציב חדש
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={openAddExpenseModal}
                    >
                        הוצאה חדשה 
                    </Button>
                </Stack>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minimax(300px, 1fr))",
                        gap: "1rem",
                        alignItems: "flex-start"
                    }}
                >
                    {budgets.map(budget => {
                        const amount = getBudgetExpenses(budget.id)
                            .reduce((total, expense) => total + expense.amount, 0);
                        return (
                            <BudgetCard
                                key={budget.id}
                                name={budget.name}
                                amount={amount}
                                max={budget.max}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                            />
                        )
                    })}
                    <UncategorizedBudgetCard
                        onAddExpenseClick={openAddExpenseModal}
                        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ViewExpensesModal
                budgetId={viewExpensesModalBudgetId}
                handleClose={() => setViewExpensesModalBudgetId()}
            />
        </>
    )
}

export default App;