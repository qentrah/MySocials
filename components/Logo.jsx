import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-25 animate-pulse"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        MySocials
      </span>
    </div>
  );
}
