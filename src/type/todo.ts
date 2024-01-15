export type Todo = {
    date: string,
    list: TodoType[]
}

export type TodoType = {
    id?: number,
    title?: string,
    isComplete?: boolean,
    description?: string,
    endTime?: string,
}