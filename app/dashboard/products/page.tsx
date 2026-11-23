"use client";

import { Fragment, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Product = {
	id: string | number;
	sku: string;
	name: string;
	stock: number;
	status: string;
	price: number;
	compareAt?: number | null;
	brand?: string;
	model?: string;
	media?: { url: string }[];
};

type PaginationInfo = {
	pageNumber: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
};

type ProductsResponse = {
	products: Product[];
	pagination: PaginationInfo;
};

const headers = [
	"SKU",
	"Name",
	"Stock",
	"Status",
	"Price",
	"Compare At",
	"Brand",
	"Model",
	"Actions",
];

function ProductsContent() {
	const searchParams = useSearchParams();
	const currentPage = Math.max(1, Number(searchParams.get("pageNumber")) || 1);
	const pageSize = Math.max(1, Number(searchParams.get("pageSize")) || 10);

	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [pagination, setPagination] = useState<PaginationInfo>({
		pageNumber: currentPage,
		pageSize,
		totalCount: 0,
		totalPages: 0,
	});

	useEffect(() => {
		let cancelled = false;

		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);

				// Path must match your rewrite: /backend-api/* -> backend
				const res = await api.get<ProductsResponse>("/products", {
					params: { pageNumber: currentPage, pageSize },
				});

				if (cancelled) return;
				setProducts(res.data.products ?? []);
				setPagination(res.data.pagination);
			} catch (err) {
				if (cancelled) return;
				console.error("Failed to fetch products:", err);
				setProducts([]);
				setError("Could not load products. Please try again.");
				toast.error("Failed to load products");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchProducts();
		return () => {
			cancelled = true;
		};
	}, [currentPage, pageSize]);

	const pageHref = (pageNumber: number) =>
		`/dashboard/products?pageSize=${pageSize}&pageNumber=${pageNumber}`;

	const visiblePages = Array.from(
		{ length: pagination.totalPages },
		(_, index) => index + 1,
	).filter(
		(page) =>
			page === 1 ||
			page === pagination.totalPages ||
			Math.abs(page - currentPage) <= 1,
	);

	const prevDisabled = currentPage <= 1;
	const nextDisabled =
		pagination.totalPages === 0 || currentPage >= pagination.totalPages;

	return (
		<div className="flex min-h-full w-full flex-col gap-5 overflow-x-hidden p-2 sm:p-4">
			<div className="w-full rounded-xl border bg-background p-4 sm:p-6">
				<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
					<div className="space-y-1">
						<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
							Products
						</h1>
						<p className="text-sm text-muted-foreground">
							Manage your products, inventory, pricing and product details.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<div className="rounded-lg border bg-muted/30 px-4 py-2">
							<p className="text-xs font-medium text-muted-foreground">
								Total Products
							</p>
							<p className="text-xl font-bold">{pagination.totalCount}</p>
						</div>

						<div className="rounded-lg border bg-muted/30 px-4 py-2">
							<p className="text-xs font-medium text-muted-foreground">
								Current Page
							</p>
							<p className="text-xl font-bold">
								{pagination.totalPages === 0
									? "0 / 0"
									: `${currentPage} / ${pagination.totalPages}`}
							</p>
						</div>

						<Link
							href="/dashboard/products/add-product"
							className="w-full sm:w-auto"
						>
							<Button className="w-full gap-2">
								<span className="text-lg">+</span>
								Add Product
							</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="w-full max-w-full overflow-x-auto rounded-lg border bg-background">
				<Table className="min-w-250">
					<TableCaption className="py-4 text-sm text-muted-foreground">
						A list of your products.
					</TableCaption>
					<TableHeader className="bg-muted/50">
						<TableRow className="hover:bg-muted/50">
							<TableHead className="w-20" />
							{headers.map((h) => (
								<TableHead
									key={h}
									className="text-xs font-semibold uppercase tracking-wide"
								>
									{h}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading ? (
							<TableRow>
								<TableCell
									colSpan={headers.length + 1}
									className="py-10 text-center text-muted-foreground"
								>
									Loading products...
								</TableCell>
							</TableRow>
						) : error ? (
							<TableRow>
								<TableCell
									colSpan={headers.length + 1}
									className="py-10 text-center text-destructive"
								>
									{error}
								</TableCell>
							</TableRow>
						) : products.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={headers.length + 1}
									className="py-10 text-center text-muted-foreground"
								>
									No products found on this page.
								</TableCell>
							</TableRow>
						) : (
							products.map((item) => {
								const image = item.media?.[0]?.url;
								return (
									<TableRow
										key={item.id}
										className="transition-colors hover:bg-muted/40"
									>
										<TableCell className="py-3">
											{image ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={image}
													alt={item.name}
													className="aspect-square w-12 rounded-md border object-cover"
												/>
											) : (
												<div className="aspect-square w-12 rounded-md border bg-muted" />
											)}
										</TableCell>
										<TableCell className="whitespace-nowrap font-mono text-sm">
											{item.sku}
										</TableCell>
										<TableCell className="font-medium">{item.name}</TableCell>
										<TableCell>{item.stock}</TableCell>
										<TableCell>{item.status}</TableCell>
										<TableCell>{item.price}</TableCell>
										<TableCell>{item.compareAt ?? "-"}</TableCell>
										<TableCell>{item.brand ?? "-"}</TableCell>
										<TableCell>{item.model ?? "-"}</TableCell>
										<TableCell />
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={pageHref(Math.max(1, currentPage - 1))}
							aria-disabled={prevDisabled}
							tabIndex={prevDisabled ? -1 : undefined}
							className={
								prevDisabled ? "pointer-events-none opacity-50" : undefined
							}
						/>
					</PaginationItem>

					{visiblePages.map((page, index) => (
						<Fragment key={page}>
							{index > 0 && page - visiblePages[index - 1] > 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem>
								<PaginationLink
									href={pageHref(page)}
									isActive={page === currentPage}
									aria-current={page === currentPage ? "page" : undefined}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						</Fragment>
					))}

					<PaginationItem>
						<PaginationNext
							href={pageHref(Math.min(pagination.totalPages, currentPage + 1))}
							aria-disabled={nextDisabled}
							tabIndex={nextDisabled ? -1 : undefined}
							className={
								nextDisabled ? "pointer-events-none opacity-50" : undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}

export default function ProductsPageWrapper() {
	return (
		<Suspense fallback={<div className="p-6">Loading...</div>}>
			<ProductsContent />
		</Suspense>
	);
}