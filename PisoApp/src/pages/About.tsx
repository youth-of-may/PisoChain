import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, FileCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-source text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E4E79] mb-4">
          About PisoChain
        </h1>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-700 font-inter px-4">
          PisoChain is a blockchain-powered budget ledger designed to revolutionize transparency in government spending. By leveraging Web3 technology, we create an immutable, publicly accessible record of every peso allocated and spent on public infrastructure projects.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-source text-2xl sm:text-3xl font-bold text-[#1E4E79] mb-8 text-center">
          Why PisoChain?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#1E4E79] rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Immutable Records</h3>
            <p className="text-sm text-gray-600">
              All transactions are permanently recorded on the blockchain, preventing tampering or unauthorized modifications.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#1E4E79] rounded-full">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Full Transparency</h3>
            <p className="text-sm text-gray-600">
              Citizens can track every peso from budget allocation to project completion in real-time.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#1E4E79] rounded-full">
                <FileCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Automated Auditing</h3>
            <p className="text-sm text-gray-600">
              Smart contracts enforce compliance and create automatic audit trails for every transaction.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#1E4E79] rounded-full">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Secure by Design</h3>
            <p className="text-sm text-gray-600">
              Blockchain cryptography ensures data integrity and protects against fraud and corruption.
            </p>
          </Card>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-source text-2xl sm:text-3xl font-bold text-[#1E4E79] mb-8 text-center">
          How It Works
        </h2>
        
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1E4E79] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Project Proposal</h3>
                <p className="text-gray-600">
                  Government agencies submit infrastructure projects with detailed budgets, timelines, and specifications. All proposals are recorded on the blockchain.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1E4E79] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Smart Contract Execution</h3>
                <p className="text-gray-600">
                  Approved projects are managed through smart contracts that automatically enforce budget limits, approval workflows, and compliance requirements.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1E4E79] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Every expense, payment, and milestone is recorded on the blockchain, creating a transparent audit trail accessible to all citizens.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[#1E4E79] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#1E4E79]">Public Accountability</h3>
                <p className="text-gray-600">
                  Citizens can monitor projects in real-time, verify expenses, and ensure funds are used as intended—fostering trust and accountability.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}