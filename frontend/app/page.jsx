import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Vote } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">    

      <div className="flex flex-col items-center justify-center px-6 text-center">

        <div className="max-w-4xl mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Collaborative Event Planning Made Simple
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed">
            Create events, invite participants, and let everyone vote on the perfect date. 
            No more endless group chats trying to coordinate schedules.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-6 text-lg font-semibold border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Button>
          
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          <Card className="bg-slate-800/50 border-slate-700 p-8 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Smart Scheduling</h3>
              <p className="text-slate-400 leading-relaxed">
                Create events with multiple date options and let participants vote on their preferred time.
              </p>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-8 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Easy Collaboration</h3>
              <p className="text-slate-400 leading-relaxed">
                Invite team members, friends, or colleagues with just their email address.
              </p>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-8 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <Vote className="h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Voting</h3>
              <p className="text-slate-400 leading-relaxed">
                See voting results instantly and make decisions based on group preferences.
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-20 p-8 rounded-2xl bg-slate-800/30 border border-slate-700 backdrop-blur-sm max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-400 mb-6 text-lg">
            Join thousands of teams who use EventPoll to coordinate their events seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4 text-lg border-0 rounded-lg"
            >
              Create Your First Event
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
    </div>
  );
}