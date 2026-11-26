"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteProduct({ product }: { product: any }) {

    const [productName, setProductName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
	
    async function handleDelete() {
        
        if (productName != product.name) {
            toast.error("Product name does not match. Please type the correct product name to confirm deletion.");
            return;
        }

        setIsLoading(true);

        try{

            await api.delete(`/api/products`,{
                params: {
                    id: product.id
                }
            });

            toast.success("Product deleted successfully.");
            setIsLoading(false);
            setIsOpen(false);
            window.location.reload();


        }catch(error){
            toast.error("Failed to delete product. Please try again.");
        }
        setIsLoading(false);

    }

    return (
		<Dialog>
				<DialogTrigger 
                   >
                    <Trash className="cursor-pointer" />
                </DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Delete product</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete the product "{product.name}"?
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<Label htmlFor="name-1">Name</Label>
							<Input id="name-1" name="name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            <Label htmlFor="name-1" className="text-red-500">Type the product name to confirm deletion</Label>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose render={<Button variant="outline">Cancel</Button>} />
						<Button className="bg-red-600 hover:bg-red-700 text-background" onClick={handleDelete} disabled={isLoading}>
							{isLoading ? "Deleting..." : "Confirm"}
						</Button>
					</DialogFooter>
				</DialogContent>

		</Dialog>
	);
}