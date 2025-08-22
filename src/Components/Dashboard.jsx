import React from 'react';
import { ProgressCircle } from "@/components/ProgressCircle"
const Dashboard = () => {
    return (
        <div>




            <div className="flex items-center justify-center gap-x-5">
                <ProgressCircle value={75}>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
        75%
      </span>
                </ProgressCircle>
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        $340/$450
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Spend management control
                    </p>
                </div>
            </div>
            

        </div>
    );
};

export default Dashboard;