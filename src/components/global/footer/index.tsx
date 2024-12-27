import Link from 'next/link'

const Footer = () => {
  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
    ],
    Company: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    Resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Support', href: '/support' },
      { label: 'Terms', href: '/terms' },
    ],
  }

  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-800">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center justify-center">
                <span className="text-sm font-bold text-white">GC</span>
              </div>
              <span className="text-lg font-semibold text-white">GlamChats</span>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Automate your Instagram engagement with AI-powered responses
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} GlamChats. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-neutral-400 hover:text-white">
              <img 
                src="https://api.iconify.design/ri:twitter-x-line.svg?color=currentColor" 
                className="w-5 h-5"
                alt="Twitter"
              />
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white">
              <img 
                src="https://api.iconify.design/ri:instagram-line.svg?color=currentColor" 
                className="w-5 h-5"
                alt="Instagram"
              />
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white">
              <img 
                src="https://api.iconify.design/ri:linkedin-line.svg?color=currentColor" 
                className="w-5 h-5"
                alt="LinkedIn"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer