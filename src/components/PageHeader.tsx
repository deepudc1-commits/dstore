import { Link } from 'react-router-dom'

type PageHeaderProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  crumb: string
}

const PageHeader = ({ eyebrow, title, subtitle, crumb }: PageHeaderProps) => {
  return (
    <div className="border-b border-base-300 bg-base-200">
      <div className="align-element py-14">
        <div className="breadcrumbs p-0 text-sm text-base-content/60">
          <ul>
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li className="capitalize">{crumb}</li>
          </ul>
        </div>
        {eyebrow && <p className="eyebrow mt-6">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base-content/70">{subtitle}</p>}
      </div>
    </div>
  )
}

export default PageHeader
