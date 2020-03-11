function crew(worker) {
    if(worker.dizziness){
        worker.levelOfHydrated += worker.weight * worker.experience * 0.1;
        worker.dizziness = false;
    }

    return worker;
}