import { buildClerkProps } from '@clerk/nextjs/server'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

interface AlertComponentProps {
    type: "info" | "warning" | "error" | "success"
    icon: boolean
    title: string
    description?: string
}
export default function AlertComponent( { type, icon, title, description }: AlertComponentProps) {

// if type = info return color = blue, if success = green, if warning = yellow, if error = red

if (type === "info") {
    return (
      <div className={`rounded-md bg-blue-50 p-4`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">{title}</h3>
            {description && <div className="mt-2 text-sm text-blue-700">
              <p>
                {description}
              </p>
            </div>}
          </div>
        </div>
      </div>
    )
  }
        

  if (type === "warning") {
    return (
      <div className={`rounded-md bg-yellow-50 p-4`}>                    
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
            {description && <div className="mt-2 text-sm text-yellow-700">
              <p>
                {description}
              </p>
            </div>}
          </div>
        </div>
      </div>
    )
  }
  
  if (type === "error") {
    return (
      <div className={`rounded-md bg-red-50 p-4`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{title}</h3>
            {description && <div className="mt-2 text-sm text-red-700">
              <p>
                {description}
              </p>
            </div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-md bg-yellow-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          {description && <div className="mt-2 text-sm text-yellow-700">
            <p>
              {description}
            </p>
          </div>}
        </div>
      </div>
    </div>
  )
}
