import { useEffect, useState } from "react";

import { getMotivationalMessage } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import type { ActivityEntry, FoodEntry } from "../types";

const Dashboard = () => {
  const { user, allFoodLogs, allActivityLogs } = useAppContext();

  const [todayFood, setTodayFood] = useState<FoodEntry[]>([]);
  const [todayActivities, setTodayActivities] = useState<ActivityEntry[]>([]);

  const DAILY_CALORIE_LIMIT: number = user?.dailyCalorieIntake || 2000;

  //Load User Data
  const loadUserData = () => {
    const today = new Date().toISOString()[0];

    const foodData = allFoodLogs.filter(
      (food: FoodEntry) => food.createdAt?.split("T")[0] === today,
    );
    setTodayFood(foodData);

    const activityData = allActivityLogs.filter(
      (activity: ActivityEntry) => activity.createdAt?.split("T")[0] === today,
    );
    setTodayActivities(activityData);
  };

  useEffect(() => {
    (() => loadUserData())();
  }, [allFoodLogs, allActivityLogs]);

  const totalCalories: number = todayFood.reduce(
    (sum, item) => sum + item.calories,
    0,
  );
  const remainingCalories: number = DAILY_CALORIE_LIMIT - totalCalories;

  const totalActiveMinutes: number = todayActivities.reduce(
    (sum, item) => sum + item.duration,
    0,
  );

  const totalCaloriesBurned: number = todayActivities.reduce(
    (sum, item) => sum + item.calories,
    0,
  );

  const motivationalMessage = getMotivationalMessage(
    totalCalories,
    totalActiveMinutes,
    DAILY_CALORIE_LIMIT,
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div className="dashboard-header">
        <p className="text-emerald-100 text-sm font-medium">Welcome Back</p>
        <h1 className="text-2xl font-bold mt-2">{`Hello There 👋 ${user?.username}`}</h1>
        {/* Motivation Card */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{motivationalMessage.emoji}</span>
            <p className="text-white font-medium">{motivationalMessage.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
