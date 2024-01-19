export type Todo = {
    date: string,
    list: TodoType[]
}

export type TodoType = {
    title?: string,
    isComplete?: boolean,
    description?: string,
    endTime?: string,
    level?: number
}