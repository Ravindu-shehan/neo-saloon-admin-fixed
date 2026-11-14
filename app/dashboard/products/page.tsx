
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import api from "@/lib/api";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Product Type
interface Product {
  id: string;
  sku: string;
  name: string;
  stock: number;
  status: string;
  price: number;
  compareAt?: number | null;
  brand?: string | null;
  model?: string | null;
  media?: {
    url: string;
  }[];
}

interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

// Main Page Component
export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-5">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

// Products Component
function ProductsContent() {
  const parameters = useSearchParams();

  const pageParam = Number(parameters.get("pageNumber"));
  const sizeParam = Number(parameters.get("pageSize"));

  const currentPage =
    Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const pageSize =
    Number.isInteger(sizeParam) && sizeParam > 0 ? sizeParam : 10;

  const [products, setProducts] = useState<Product[]>([]);

  const [pagination, setPagination] = useState<Pagination>({
    pageNumber: currentPage,
    pageSize,
    totalCount: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch Products
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get<ProductsResponse>("/api/products", {
          params: {
            pageNumber: currentPage,
            pageSize,
          },
        });

        if (cancelled) return;

        setProducts(res.data.products ?? []);
        setPagination(res.data.pagination);
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch products:", error);
          toast.error("Failed to load products");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [currentPage, pageSize]);

  // Generate Page URL
  const pageHref = (pageNumber: number) =>
    `/dashboard/products?pageSize=${pageSize}&pageNumber=${pageNumber}`;

  // Generate Visible Pages
  const visiblePages = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1
  ).filter(
    (page) =>
      page === 1 ||
      page === pagination.totalPages ||
      Math.abs(page - currentPage) <= 1
  );

  if (loading) {
    return <div className="p-5">Loading products...</div>;
  }

  return (
    <div className="w-full h-full space-y-5">
      <div className="w-full overflow-x-auto rounded-lg border bg-background">
        <Table className="min-w-[1100px]">
          <TableCaption className="py-4 text-sm text-muted-foreground">
            A list of your recent products.
          </TableCaption>

          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-20"></TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Compare At</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3">
                    <img
                      src={
                        item.media?.[0]?.url ??
                        "/images/default-product.png"
                      }
                      alt={item.name}
                      className="aspect-square w-12 rounded-md border object-cover"
                    />
                  </TableCell>

                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.compareAt ?? "-"}</TableCell>
                  <TableCell>{item.brand ?? "-"}</TableCell>
                  <TableCell>{item.model ?? "-"}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <nav aria-label="Product pages" className="flex justify-center">
        <ul className="flex items-center gap-1">
          <li>
            <Link
              href={pageHref(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage <= 1}
              tabIndex={currentPage <= 1 ? -1 : undefined}
              className={`inline-flex h-9 items-center rounded-md px-3 text-sm hover:bg-muted ${
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Previous
            </Link>
          </li>

          {visiblePages.map((page, index) => (
            <li key={page}>
              {index > 0 &&
                page - visiblePages[index - 1] > 1 && (
                  <span className="px-2 text-muted-foreground">
                    ...
                  </span>
                )}

              <Link
                href={pageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm hover:bg-muted ${
                  page === currentPage
                    ? "border bg-background"
                    : ""
                }`}
              >
                {page}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href={pageHref(
                Math.max(
                  1,
                  Math.min(
                    pagination.totalPages || 1,
                    currentPage + 1
                  )
                )
              )}
              aria-disabled={
                pagination.totalPages === 0 ||
                currentPage >= pagination.totalPages
              }
              tabIndex={
                pagination.totalPages === 0 ||
                currentPage >= pagination.totalPages
                  ? -1
                  : undefined
              }
              className={`inline-flex h-9 items-center rounded-md px-3 text-sm hover:bg-muted ${
                pagination.totalPages === 0 ||
                currentPage >= pagination.totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
