import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: new Date(), amount: 200, type: "income", brand: "Nike" },
    { id: 2, date: new Date(), amount: 150, type: "expense", brand: "Adidas" },
  ]);
  const [newTransaction, setNewTransaction] = useState({
    date: new Date(),
    amount: "",
    type: "income",
    brand: "Nike",
  });

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);
    toast("Transaction added successfully.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
          <CardDescription>Track your sneaker transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <DatePickerDemo
                selected={newTransaction.date}
                onSelect={(date) => handleSelectChange(date, "date")}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={newTransaction.type}
                onValueChange={(value) => handleSelectChange(value, "type")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={newTransaction.brand}
                onValueChange={(value) => handleSelectChange(value, "brand")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                  <SelectItem value="Reebok">Reebok</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddTransaction}>Add Transaction</Button>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>View and manage your transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date.toDateString()}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.brand}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;