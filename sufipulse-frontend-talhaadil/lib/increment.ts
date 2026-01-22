const fixedStartDate = new Date("2025-09-16");

// Monthly increment capped at a fixed max
export function incrementMonthly(initialValue: number, maxValue: number): number {
  const now = new Date();

  const yearsDiff = now.getFullYear() - fixedStartDate.getFullYear();
  const monthsDiff = (yearsDiff * 12) + (now.getMonth() - fixedStartDate.getMonth());

  const monthsPassed = Math.max(0, monthsDiff); // no negative
  const value = initialValue + monthsPassed;

  return Math.min(value, maxValue); // cap at maxValue
}



export function incrementDaily(initialValue: number): number {
    const msInDay = 24 * 60 * 60 * 1000;
    const now = new Date();
    const diffInMs = now.getTime() - fixedStartDate.getTime();
    const daysPassed = Math.floor(diffInMs / msInDay);
  
    return initialValue + (daysPassed * 100);
  }


  export function incrementWeekly(initialValue: number): number {
    const msInWeek = 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const diffInMs = now.getTime() - fixedStartDate.getTime();
    const weeksPassed = Math.floor(diffInMs / msInWeek);
  
    return initialValue + weeksPassed;
  }



  export function incrementYearly(initialValue: number): number {
    const now = new Date();
  
    let yearsPassed = now.getFullYear() - fixedStartDate.getFullYear();
  
    // If current month/day is before the start month/day, subtract 1 year
    if (
      now.getMonth() < fixedStartDate.getMonth() ||
      (now.getMonth() === fixedStartDate.getMonth() && now.getDate() < fixedStartDate.getDate())
    ) {
      yearsPassed -= 1;
    }
  
    yearsPassed = Math.max(0, yearsPassed); // avoid negative before start date
  
    return initialValue + yearsPassed;
  }