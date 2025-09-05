"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
    icon?: React.ComponentType<{ className?: string }>
  }
}

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue>({
  config: {},
})

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider")
  }
  return context
}

interface ChartProviderProps {
  children: React.ReactNode
  config: ChartConfig
}

function ChartProvider({ children, config }: ChartProviderProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      {children}
    </ChartContext.Provider>
  )
}

interface ChartContainerProps {
  children: React.ReactNode
  config: ChartConfig
  className?: string
}

function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <ChartProvider config={config}>
      <div className={cn("w-full", className)}>{children}</div>
    </ChartProvider>
  )
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<{
    value?: number | string
    name?: string
    dataKey?: string
    color?: string
    payload?: {
      fill?: string
    }
  }>
  className?: string
  indicator?: "dot" | "line" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string | number
  labelFormatter?: (value: string, payload: any[]) => React.ReactNode
  labelClassName?: string
  formatter?: (value: any, name: string, item: any, index: number, payload: any) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    if (!item) return null
    
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`
    const itemConfig = config[key]
    const value = itemConfig?.label || label

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(value as string, payload)}
        </div>
      )
    }

    if (!value) {
      return null
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div
      className={cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const itemConfig = config[key]
          const indicatorColor = color || item.payload?.fill || item.color

          return (
            <div
              key={item.dataKey || index}
              className={cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon className="text-muted-foreground" />
                  ) : indicator === "dot" ? (
                    <div
                      className="h-2.5 w-2.5 rounded-full border-2 border-current"
                      style={{
                        borderColor: indicatorColor,
                      }}
                    />
                  ) : indicator === "line" ? (
                    <div
                      className="h-2.5 w-2.5 border-2 border-current"
                      style={{
                        borderColor: indicatorColor,
                      }}
                    />
                  ) : (
                    <div
                      className="h-2.5 w-2.5 border-2 border-dashed border-current"
                      style={{
                        borderColor: indicatorColor,
                      }}
                    />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {itemConfig?.label || item.name || item.dataKey}
                      </span>
                      {item?.value !== undefined && (
                        <span className="font-medium">
                          {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

interface ChartLegendProps {
  payload?: Array<{
    value: string
    type: string
    color: string
  }>
  verticalAlign?: "top" | "middle" | "bottom"
  className?: string
}

function ChartLegend({ payload, verticalAlign = "top", className }: ChartLegendProps) {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        verticalAlign === "top" && "justify-center",
        verticalAlign === "middle" && "justify-center",
        verticalAlign === "bottom" && "justify-center",
        className
      )}
    >
      {payload.map((item) => {
        const itemConfig = config[item.value]
        const indicatorColor = item.color

        return (
          <div key={item.value} className="flex items-center gap-2">
            {itemConfig?.icon ? (
              <itemConfig.icon className="text-muted-foreground" />
            ) : (
              <div
                className="h-2.5 w-2.5 rounded-full border-2 border-current"
                style={{
                  borderColor: indicatorColor,
                }}
              />
            )}
            <span className="text-sm text-muted-foreground">
              {itemConfig?.label || item.value}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartProvider,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  useChart,
}
