import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useMemo } from "react";
import { LoadingOutlined } from "@ant-design/icons";

// Reference: https://vincentdusautoir.com/posts/button-variants-tailwindcss
const solidVariants = cva("", {
  variants: {
    variant: {
      default:
        "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
      brand:
        "outline-none bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 text-white hover:outline-2 outline-offset-0 hover:outline-zinc-900 transition-all bg-left hover:bg-right bg-[size:200%]",
      destructive:
        "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
    },
  },
});

const outlineVariants = cva("border-2", {
  variants: {
    variant: {
      default:
        "text-zinc-900 hover:bg-zinc-200 border-zinc-900 dark:text-white dark:hover:bg-zinc-200 dark:border-white dark:hover:bg-white/20",
      brand: "text-brand-500 hover:bg-brand-400/20 border-brand-500",
      destructive: "text-red-500 hover:bg-red-400/20 border-red-500",
    },
  },
});

const subtleVariants = cva("", {
  variants: {
    variant: {
      default:
        "text-zinc-900 bg-zinc-200 hover:bg-zinc-300 border-zinc-900 dark:text-white dark:hover:bg-zinc-200 dark:border-white dark:bg-white/20 dark:hover:bg-white/30",
      brand:
        "text-brand-500 bg-brand-400/20 hover:bg-brand-400/30 border-brand-500",
      destructive:
        "text-red-500 bg-red-400/20 hover:bg-red-400/30 border-red-500",
    },
  },
});

const ghostVariants = cva("", {
  variants: {
    variant: {
      default:
        "text-zinc-900 hover:bg-zinc-200 border-zinc-900 dark:text-white dark:hover:bg-zinc-200 dark:border-white dark:hover:bg-white/20",
      brand: "text-brand-500 hover:bg-brand-400/20 border-brand-500",
      destructive: "text-red-500 hover:bg-red-400/20 border-red-500",
    },
  },
});

// reference: https://vincentdusautoir.com/posts/button-variants-tailwindcss
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: solidVariants({ variant: "default" }),
        brand: solidVariants({ variant: "brand" }),
        destructive: solidVariants({ variant: "destructive" }),
        link: "bg-transparent underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-100 hover:bg-transparent dark:hover:bg-transparent",
        unstyled: "",
        outline: outlineVariants({ variant: "default" }),
        "outline-brand": outlineVariants({ variant: "brand" }),
        "outline-destructive": outlineVariants({ variant: "destructive" }),
        ghost: ghostVariants({ variant: "default" }),
        "ghost-brand": ghostVariants({ variant: "brand" }),
        "ghost-destructive": ghostVariants({ variant: "destructive" }),
        subtle: subtleVariants({ variant: "default" }),
        "subtle-brand": subtleVariants({ variant: "brand" }),
        "subtle-destructive": subtleVariants({ variant: "destructive" }),
      },
      size: {
        xs: "text-xs h-6 min-w-[24px] px-2",
        sm: "text-sm h-8 min-w-[32px] px-3",
        md: "text-base h-10 min-w-[40px] px-4",
        lg: "text-lg h-12 min-w-[48px] px-6",
        xl: "text-xl h-14 min-w-[56px] px-8",
      },
      iconMargin: {},
      iconSize: {},
      rounded: {
        none: "rounded-none",
        md: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "full",
      size: "sm",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    rounded,
    loading,
    icon,
    disabled,
    children,
    ...props
  }, ref) => {
    const innerIcon = useMemo(() => {
      return loading ? <LoadingOutlined /> : icon;
    }, [icon, loading]);
    const isIconOnly = useMemo(() => {
      return children === undefined || (typeof children === "string" && children.trim() === "");
    }, [children]);
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, rounded, className }),
          loading && "cursor-wait", isIconOnly && "p-0",
          "transition-all"
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {innerIcon === undefined ? null :
          <span className={cn(!isIconOnly && "mr-2 flex justify-center items-center")}>{innerIcon}</span>}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
