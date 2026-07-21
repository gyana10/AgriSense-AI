#"""Create a python program that manages and analyzes student marks using built-on fuctions
#1. Takestudent marks as Input
#2.Store marks in a list
#3.Validate marks using all()
#4.Calculate total,maximun,minimum and count using sum(),max(),min(),len()
#5.Display subject-wise marks using enumarate
#6.Filter passed sbjects using filter()
#7.Sort marks using sorted()
#8.Find absolute difference between highest and lowest marks using abs()"""

marks = list(map(int, input("Enter marks separated by space: ").split()))

valid_marks = all(0 <= mark <= 100 for mark in marks)

if not valid_marks:
    print("Invalid marks entered! Marks should be between 0 and 100.")
else:
    print("All marks are valid.")

    total_marks = sum(marks)
    maximum_marks = max(marks)
    minimum_marks = min(marks)
    total_subjects = len(marks)

    print("\nMarks Summary")
    print("Total Marks:", total_marks)
    print("Maximum Marks:", maximum_marks)
    print("Minimum Marks:", minimum_marks)
    print("Total Subjects:", total_subjects)

    print("\nSubject-wise Marks:")
    for index, mark in enumerate(marks, start=1):
        print(f"Subject {index}: {mark}")

    passed_marks = list(filter(lambda x: x >= 40, marks))
    print("\nPassed Subjects Marks:", passed_marks)

    sorted_marks = sorted(marks)
    print("\nSorted Marks:", sorted_marks)

    abs_difference = abs(maximum_marks - minimum_marks)
    print("\nAbsolute Difference (Max - Min):", abs_difference)
