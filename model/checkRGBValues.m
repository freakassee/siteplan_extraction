function indexOfCategory = checkRGBValues(points)
    
    isBlack = points(:,1)<80.&points(:,2)<80.&points(:,3)<80;
    nrBlack = length(isBlack(isBlack==1));
    
    isYellow = points(:,1)>100.&points(:,2)>100.&points(:,3)<50;
    nrYellow =length(isYellow(isYellow==1));
    
    isRed = points(:,1)>100.&points(:,2)<50.&points(:,3)<50;
    nrRed= length(isRed(isRed==1));
    
    isBlue = points(:,1)<50.&points(:,2)<50.&points(:,3)>100;
    nrBlue=length(isBlue(isBlue==1));
      
    [value, indexOfCategory] = max([0,nrYellow,nrRed,nrBlue]);
    
    if (value + nrBlack)<length(points)/2  
       indexOfCategory = 0;
    end

end


%'rettung  ';'fuehrung ';'feuerwehr';'thw