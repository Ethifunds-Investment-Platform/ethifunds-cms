import Transactions from "@/features/transactions";
import useSeo from "@/hooks/use-seo";

export default function TransactionsPage() {
    useSeo({pageTitle:"Transactions"})
    return <Transactions/>
}