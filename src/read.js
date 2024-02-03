exports.getAllWorkOrders=async(req,res)=>{
    try {
        const workorders = [{"wo_id":"wo111",'date_of_creation':'2022-02-22', 'assignee': 'John Doe'}, {"wo_id":"wo222",'date_of_creation':'2022-02-23', 'assignee': 'Hazel Nutt'}]
        res.json(workorders);
    } catch (error) {
        res.status(500).json(error);
    }
}