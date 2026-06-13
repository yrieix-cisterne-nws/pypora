export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm text-gray-900">TutoHub</p>
          <p className="text-xs text-gray-400 mt-0.5">© 2024 TutoHub. Empowering learners globally.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {["LinkedIn", "Terms of Service", "Privacy Policy", "Contact Support"].map((link) => (
            <a key={link} href="#" className="text-xs text-gray-500 hover:text-violet-700 transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}